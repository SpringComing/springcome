import React from 'react';
import Process from './Process';
import { DragDropContext } from "react-beautiful-dnd";
import update from 'react-addons-update';
const SERVER_URL = "http://localhost:8080";
const KanbanMain = ({projectNo, processes, setProcesses, reUploadProcesses}) => {

    const changeTaskSameProc = async(
      processNo, 
      taskNo, 
      oriTaskSeq, 
      newTaskSeq, 
      copiedItems, 
      sourcedroppableId) => {
/*
        console.log( "processNo "+ processNo + "\noriTaskSeq "+ 
        oriTaskSeq + "\nnewTaskSeq "+ 
        newTaskSeq + "\ntaskNo "+ 
        taskNo + "\ncopiedItems "+ 
        copiedItems + "\nsourcedroppableId "+ 
        sourcedroppableId);
*/      
      try {
        const response = await fetch(`/api/task/same`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
              processNo: processNo,
              taskNo: taskNo,
              oriTaskSeq: oriTaskSeq,
              newTaskSeq: newTaskSeq
            })
        });

        if(!response.ok) {
            throw  `${response.status} ${response.statusText}`;
        }

        const json = await response.json();

        // update가 안 된 경우
        if(!json.data) {
            return;
        }

        // update가 된 경우
        setProcesses(update(processes, {
          [sourcedroppableId]: {
            tasks: { 
              $set: copiedItems 
            }
          }
        }));

      } catch (err) {
        console.error(err);
      }
    }

    const changeTaskDiffProc = async(
      oriProcessNo, 
      newProcessNo, 
      oriTaskSeq, 
      newTaskSeq, 
      taskNo, 
      sourceItems, 
      destItems, 
      sourcedroppableId, 
      destinationdroppableId) => {
/*      
        console.log(oriProcessNo + " "+ 
          newProcessNo + " "+ 
          oriTaskSeq + " "+ 
          newTaskSeq + " "+ 
          taskNo + " "+ 
          sourceItems + " "+ 
          destItems + " "+ 
          sourcedroppableId + " "+ 
          destinationdroppableId);
*/
      try {
        const response = await fetch(`/api/task/diff`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
              oriProcessNo: oriProcessNo,
              newProcessNo: newProcessNo,
              oriTaskSeq: oriTaskSeq,
              newTaskSeq: newTaskSeq,
              taskNo: taskNo
            })
        });

        if(!response.ok) {
            throw  `${response.status} ${response.statusText}`;
        }

        const json = await response.json();

        // update가 안 된 경우
        if(!json.data) {
            return;
        }

        // update가 된 경우
        setProcesses(update(processes, {
          [sourcedroppableId]: {
            tasks: { $set: sourceItems }
          },
          [destinationdroppableId]: {
            tasks: { $set: destItems }
          }
        }));

      } catch (err) {
        console.error(err);
      }

    }

    const onDragEnd = (result) => {
      // droppableId : process의 index
      // draggableId : task.no
      // index : task의 index
      let { source, destination } = result;

      if (!result.destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;
      
      if (source.droppableId !== destination.droppableId) { // 다른 프로세스에 놓았을 때
        let sourceColumn = processes[source.droppableId];
        let destColumn = processes[destination.droppableId];
        let sourceItems = sourceColumn.tasks;
        let destItems = destColumn.tasks;
        
        let [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        
        //console.log(sourceColumn.no);

        changeTaskDiffProc(
          sourceColumn.no, 
          destColumn.no, 
          source.index+1, 
          destination.index+1, 
          destItems[destination.index].no, 
          sourceItems, 
          destItems, 
          source.droppableId, 
          destination.droppableId);

      } else { // 같은 프로세스에 놓았을 때
        let column = processes[source.droppableId];
        let copiedItems = column.tasks;
        let [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        changeTaskSameProc(
          column.no, 
          copiedItems[destination.index].no, 
          source.index+1, 
          destination.index+1, 
          copiedItems, 
          source.droppableId);
      }

    }

    return (
        <section className="kanban__main">
            <div className="kanban__main-wrapper">
                <DragDropContext onDragEnd={onDragEnd}>                           
                    {processes.map((process, index) => {
                        return(  
                            <Process 
                            key={process.no} 
                            projectNo={projectNo} 
                            processes={processes} 
                            setProcesses={setProcesses} 
                            pindex={index}
                            reUploadProcesses={reUploadProcesses} />
                        );
                    })}
                </DragDropContext>
            </div>
        </section>
    );
    
}

export default KanbanMain;



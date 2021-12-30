import React from "react";
//import { connect } from "react-redux";
//import { boardOpen } from "../../../actions";

// class Title extends React.Component {
//   render() {
//     const { board } = this.props;
//     return (
//       <div className="kanban__nav-name">
//         <div className="kanban-name">프로젝트</div>
//         <div className="kanban-arrow" onClick={this.handleBoardOpen}>
//           <i className="material-icons">
//             {board ? "expand_more" : "chevron_right"}
//           </i>
//         </div>
//       </div>
//     );
//   }

//   handleBoardOpen = () => {
//     const { boardOpen } = this.props;
//     boardOpen();
//   };
// }

// const mapStateToProps = state => ({
//   board: state.board
// });

// export default connect(
//   mapStateToProps,
//   { boardOpen }
// )(Title);

const Title = () => {
  return (
    <div className="kanban__nav-name">
        <div className="kanban-name">프로젝트</div>  
    </div>
  );
};

export default Title;
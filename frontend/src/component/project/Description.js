import React from 'react';
import styles from '../../assets/css/component/project/Description.scss'

const Description = ({ desc, startDate, endDate }) => {

    return (
        <div className={ styles.card }  >
                <div className="card__header">
                    <div className="card-container-color card-color-low"><div className={ styles.desc_card_name }>설명</div></div>
                </div>

                <div className={ styles.project_desc_text }>{ desc }</div>
                <br/>
                <div className="project_date card__text" >{ startDate + " ~ " +  endDate }</div>

                
                {/* <div className="card__menu">
                    <div className="card__menu-left">
                        <div className="comments-wrapper">
                            <div className="comments-ico"><i className="material-icons">comment</i></div>
                            <div className="comments-num">1</div>
                        </div>
                        <div className="attach-wrapper">
                            <div className="attach-ico"><i className="material-icons">attach_file</i></div>
                            <div className="attach-num">2</div>
                        </div>
                    </div> 
                    <div className="card__menu-right">
                        <div className="add-peoples"><i className="material-icons">add</i></div>
                    </div>
                </div> */}


        </div>
    );
};

export default Description;
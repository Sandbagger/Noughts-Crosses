import React from 'react';

function Settings(props){
    return (
      <fieldset>
        <legend>Game settings</legend>
        <div>
          <input type="radio" id="PvP" name="setting" onChange={props.onClickPvp} defaultChecked></input>
          <label>P vs P</label>
       </div>
       <div>
         <input type="radio" id="PvC" name="setting" onChange={props.onClickPvc} ></input>
         <label>P vs C</label>
       </div>
       <button onClick={props.onClickReset}>Reset game</button>
  </fieldset>
      );
  }
  
  
  export default Settings;
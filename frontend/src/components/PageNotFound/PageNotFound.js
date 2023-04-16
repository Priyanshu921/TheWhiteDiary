import React from 'react'
import pnfStyle from './pageNotFound.module.scss'
import { Link } from 'react-router-dom'
import Snowfall from "react-snowfall";
export const PageNotFound = () => {
    document.body.style.overflowY = "hidden"
  return (
    <div>
      <div className={pnfStyle.content}>
        {/* <canvas className={pnfStyle.snow} id="snow"></canvas> */}
        <Snowfall snowflakeCount={700} color={"#f2f2bc"} />
        <div className={pnfStyle.main_text}>
          <h1>
            Aw jeez.
            <br />
            That page has gone missing.
          </h1>
          <Link to="/" className={pnfStyle.home_link}>
            Hitch a ride back home.
          </Link>
        </div>
        <div className={pnfStyle.ground}>
          <div className={pnfStyle.mound}>
            <div className={pnfStyle.mound_text}>404</div>
            <div className={pnfStyle.mound_spade}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

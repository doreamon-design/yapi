import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';


if (ENV_PARAMS.development) {
  module.exports = createDevTools(
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
      defaultIsVisible={false}
    >
      <LogMonitor />
    </DockMonitor>
  );
}else{
  module.exports = ()=>{
    return null;
  }
}
import { observer } from "mobx-react";
import "./App.css";
import Area from "./models/Area";
import SetArea from "./components/SetArea";
import { Card, Tabs } from "antd";
import { useState } from "react";

const App = observer(({ area }: { area: Area }) => {
  const [activeKey, setActiveKey] = useState<string>('area');

  const onCreateNew = (width: number, height: number) => {
    setActiveKey('create-robot');
    area.setDimensions({ width, height });
  }

  const onCreateRobot = () => {
    setActiveKey('log');
  }

  return (
    <div className="App">
      <Card title="Jason Felix's LME Tech Test">
        <Tabs 
          type="card"
          activeKey={activeKey}
          onTabClick={key => setActiveKey(key)}
          tabBarExtraContent={{right: <>Area Dimensions: width: {area.getDimensions().width} height: {area.getDimensions().height}</>}}
        >
          <Tabs.TabPane tab="Area" key="area">
            <SetArea area={area} onCreate={onCreateNew} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Create Robot" key="create-robot">
          </Tabs.TabPane>
          <Tabs.TabPane tab="Robot Log" key="log">
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
});

export default App;

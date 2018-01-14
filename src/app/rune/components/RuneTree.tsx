import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Button } from 'antd';
import { rune, getRuneByName, mainPaths } from 'static';
import { IRuneData, pathName } from 'models';
import { RuneLine, RuneIcon, RuneArray, RuneSecondarySelect } from './';

const Tree: any = styled.div`
  background: ${({ name }: any) => `url('/static/img/runes/${name.toLowerCase()}/environment.png')`};
  min-height: 650px;
  padding: 40px 0 0 40px;
  margin-top: 10px;
  display: flex;
`;

const Primary = styled.div`
  display: flex;
  position: relative;
  width: 50px;
  margin-right: 250px;
  flex-direction: column;
  align-items: center;
`;

const Secondary = styled.div`
  width: 300px;
  height: 50px;
`;

const MainDescription = styled.div`
  position: absolute;
  width: 200px;
  left: 75px;
  color: white;
  h3 {
    color: white;
  }
`;

const Head = styled.div`
  display: flex;
`;

export interface IRuneTreeProps {
  mainPath: number;
  secondaryPath: number;
  slots: any;
  resetRune(): void;
  addRune({ slotIdx, runeId }: { slotIdx: number; runeId: number }): void;
  selectSecondary(): void;
}

export class RuneTree extends React.Component<IRuneTreeProps> {
  render() {
    const { resetRune, mainPath, secondaryPath, slots, addRune, selectSecondary } = this.props;
    const primaryData: IRuneData = getRuneByName(rune, mainPath);
    const secondaryData: IRuneData = secondaryPath && getRuneByName(rune, secondaryPath);
    const runeName = primaryData.name;
    const secondaryName = _.get(secondaryData, 'name', '');
    const availableSecondary = _.filter(mainPaths, path => path.id !== mainPath);
    const primaryDescription = _.find(mainPaths, { id: mainPath });
    const secondaryDescription = _.find(mainPaths, { id: secondaryPath });

    return (
      <div>
        <Button icon="reload" onClick={resetRune} />
        <Tree name={runeName}>
          <Primary>
            <RuneIcon onClick={resetRune} perkId="icon" path={runeName} isMain />
            <MainDescription>
              <h3>{_.upperCase(primaryDescription.title)}</h3>
              {primaryDescription.description}
            </MainDescription>
            {_.map(primaryData.slots, (runeLine, key) => (
              <RuneLine
                slots={slots}
                addRune={addRune}
                slotIdx={key}
                path={runeName}
                key={key}
                isMain={key === 0}
                {...runeLine}
              />
            ))}
          </Primary>
          <Secondary>
            <RuneSecondarySelect
              secondaryDescription={secondaryDescription}
              availableSecondary={availableSecondary}
              secondaryName={secondaryName}
              selectSecondary={selectSecondary}
            />
            {secondaryPath && (
              <RuneArray addRune={addRune} path={secondaryName} slots={slots} runeData={_.drop(secondaryData.slots)} />
            )}
          </Secondary>
        </Tree>
      </div>
    );
  }
}

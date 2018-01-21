import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { MainPage, DevTools, AppLayout, NoMatch } from './';
import { SummonerProfilePage, MatchPage } from '../../summoner/components';
import { ConnectedDndProfile as ItemSetProfile } from '../../itemset/components';
import { ConnectedCalc as RuneCalc } from '../../rune/components';
import { ConnectedModal } from '../../options';
import { isDev } from 'utils';
import { IStore } from 'models';

export const Routes = () => (
  <AppLayout>
    {isDev && <DevTools />}
    <ConnectedModal />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/match/:matchid" component={MatchPage} />
      <Route path="/summoner/:account/:id" component={SummonerProfilePage} />
      <Route path="/itemset" component={ItemSetProfile} />
      <Route path="/rune" component={RuneCalc} />
      <Route component={NoMatch} />
    </Switch>
  </AppLayout>
);

export const ConnectedRoutes = connect(({ auth }: IStore) => auth)(Routes);

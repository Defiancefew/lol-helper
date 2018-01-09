import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { App, DevTools, AppLayout, NoMatch } from './';
import { AuthForm } from '../../auth/components';
import { ConnectedSearch as Summoner, SummonerProfilePage, MatchPage } from '../../summoner/components';

export const Routes = () => (
  <AppLayout>
    <DevTools />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/keycheck" component={AuthForm} />
      <Route path="/summoner/match/:matchid" component={MatchPage} />
      <Route path="/summoner/:profile" component={SummonerProfilePage} />
      <Route path="/summoner" component={Summoner} />
      {/* <Route path="/itemset" component={ItemSet} /> */}
      <Route component={NoMatch} />
    </Switch>
  </AppLayout>
);

export const ConnectedRoutes: any = connect(({ auth }: any) => auth, null)(Routes);

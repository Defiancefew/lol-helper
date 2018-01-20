import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { News, DevTools, AppLayout, NoMatch } from './';
import { AuthForm } from '../../auth/components';
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
      <Route exact path="/" component={News} />
      <Route path="/keycheck" component={AuthForm} />
      <Route path="/summoner/match/:matchid" component={MatchPage} />
      <Route path="/summoner/:account/:id" component={SummonerProfilePage} />
      <Route path="/itemset" component={ItemSetProfile} />
      <Route path="/rune" component={RuneCalc} />
      <Route component={NoMatch} />
    </Switch>
  </AppLayout>
);

export const ConnectedRoutes = connect(({ auth }: IStore) => auth)(Routes);

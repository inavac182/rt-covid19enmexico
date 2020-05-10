import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';

import { MatchProps } from 'src/types';
import { CasesStore } from 'src/stores';
import { Dashboard } from '.';

interface HomePageProps {
  casesStore?: CasesStore;
  routing?: RouterStore;
  match: MatchProps;
}

export const HomePage = inject(
  'casesStore',
  'routing'
)(
  observer((props: HomePageProps) => {
    const { casesStore } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      casesStore.fetch(() => {
        setLoading(false);
      });
    }, []);

    return <>{loading ? <p>Loading...</p> : <Dashboard />}</>;
  })
);

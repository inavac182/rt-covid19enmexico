import React from 'react';
import { CasesStore } from 'src/stores';
import { inject, observer } from 'mobx-react';
import { FactorsGraph } from '.';

interface StatesListProps {
  casesStore?: CasesStore;
}

export const StatesList = inject('casesStore')(
  observer((props: StatesListProps) => {
    const { casesStore } = props;
    const { statesR0, loading } = casesStore;

    return (
      <section className="states-list center-content">
        {loading && <p>Loading...</p>}
        {!loading &&
          statesR0.map((state, key) => (
            <div className="state-graph margin-top-three" key={key}>
              <h3>{state.state.name}</h3>
              <FactorsGraph factors={state.factor} />
            </div>
          ))}
        <div className="clearer"></div>
      </section>
    );
  })
);

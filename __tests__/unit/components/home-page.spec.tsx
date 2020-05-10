import * as React from 'react';
import { HomePage } from '../../../src/components/';
import { HomePageStore } from '../../../src/stores/home-page.store';
import { TestProvider } from '../../../src/utils/testProvider';

describe ('HomePage', () => {
    const stores = {
      homePageStore: new HomePageStore()
    };

    it('renders correctly', () => {
      const homepage = TestProvider(stores).render(<HomePage match={{}} />);
      expect(homepage).toMatchSnapshot();
    });

    it('should render home page with correct title', () => {
      const expectedTitle = 'My Title';
      const stores = {
        homePageStore: new HomePageStore({
          title: expectedTitle
        })
      };

      const homePageWrapper = TestProvider(stores).mount(<HomePage  match={{}} />);
      const title = homePageWrapper.find('h1');

      expect(title.text()).toBe(expectedTitle);
    });
});


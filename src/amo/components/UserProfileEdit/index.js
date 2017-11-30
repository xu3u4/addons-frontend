/* @flow */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import { setViewContext } from 'amo/actions/viewContext';
// import CategoryIcon from 'amo/components/CategoryIcon';
// import HomeHeroBanner from 'amo/components/HomeHeroBanner';
// import LandingAddonsCard from 'amo/components/LandingAddonsCard';
import Link from 'amo/components/Link';
// import { fetchHomeAddons } from 'amo/reducers/home';
// import {
//   ADDON_TYPE_EXTENSION,
//   ADDON_TYPE_THEME,
//   SEARCH_SORT_TRENDING,
//   VIEW_CONTEXT_HOME,
// } from 'core/constants';
import { withErrorHandler } from 'core/errorHandler';
import translate from 'core/i18n/translate';
import Card from 'ui/components/Card';
import Icon from 'ui/components/Icon';

import './styles.scss';


export class UserProfileEditBase extends React.Component {
  componentWillMount() {
    // const { dispatch, errorHandler, resultsLoaded } = this.props;

    // dispatch(setViewContext(VIEW_CONTEXT_HOME));

    // if (!resultsLoaded) {
    //   dispatch(fetchHomeAddons({
    //     errorHandlerId: errorHandler.id,
    //     firstCollectionSlug: FIRST_COLLECTION_SLUG,
    //     firstCollectionUser: FIRST_COLLECTION_USER,
    //     secondCollectionSlug: SECOND_COLLECTION_SLUG,
    //     secondCollectionUser: SECOND_COLLECTION_USER,
    //   }));
    // }
  }

  render() {
    const {
      errorHandler,
      i18n,
      user,
    } = this.props;

    const userProfileForText = i18n.sprintf(
      i18n.gettext('User Profile for %(user)s'), { user: user.displayName }
    );

    return (
      <div className="UserProfile">
        <Helmet>
          <title>{userProfileForText}</title>
        </Helmet>

        {errorHandler.renderErrorIfPresent()}

        <Card header={userProfileForText}>
          <p>Change your profile!</p>

          <p>Right now it's boring.</p>
        </Card>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default compose(
  connect(mapStateToProps),
  translate(),
  withErrorHandler({ name: 'UserProfileEdit' }),
)(UserProfileEditBase);

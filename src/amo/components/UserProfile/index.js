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
import { fetchUserAccount } from 'amo/reducers/users';
// import {
//   ADDON_TYPE_EXTENSION,
//   ADDON_TYPE_THEME,
//   SEARCH_SORT_TRENDING,
//   VIEW_CONTEXT_HOME,
// } from 'core/constants';
import { withErrorHandler } from 'core/errorHandler';
import translate from 'core/i18n/translate';
import { sanitizeUserHTML } from 'core/utils';
import Card from 'ui/components/Card';
import Icon from 'ui/components/Icon';
import LoadingText from 'ui/components/LoadingText';

import './styles.scss';


export class UserProfileBase extends React.Component {
  componentWillMount() {
    const { dispatch, errorHandler, params } = this.props;

    const user = this.getUser(params.username);

    if (!user) {
      dispatch(fetchUserAccount({
        errorHandlerId: errorHandler.id,
        username: params.username,
      }));
    }
  }

  componentWillReceiveProps({ params: newParams }) {
    const { dispatch, errorHandler, params: oldParams } = this.props;

    if (oldParams.username !== newParams.username) {
      dispatch(fetchUserAccount({
        errorHandlerId: errorHandler.id,
        username: newParams.username,
      }));
    }
  }

  getUser(username) {
    const { users } = this.props;

    return users.byID[users.byUsername[username]];
  }

  render() {
    const {
      errorHandler,
      i18n,
      params,
    } = this.props;

    const user = this.getUser(params.username);

    const userProfileHeaderText = i18n.sprintf(
      i18n.gettext('User Profile for %(user)s'), {
        user: user ? user.displayName : params.username,
      }
    );

    return (
      <div className="UserProfile">
        <Helmet>
          <title>{userProfileHeaderText}</title>
        </Helmet>

        {errorHandler.renderErrorIfPresent()}

        <Card header={userProfileHeaderText}>
          <img
            alt={i18n.gettext('Profile photo')}
            className="UserProfile-avatar"
            src={user ? user.picture_url : null}
          />

          <h2>{i18n.gettext('About this user')}</h2>

          <dl>
            <dt>{i18n.gettext('Name')}</dt>
            <dd>{user ? user.displayName : <LoadingText />}</dd>
            <dt>{i18n.gettext('User since')}</dt>
            <dd>
              {user ? i18n.moment(user.created).format('ll') : <LoadingText />}
            </dd>
            <dt>{i18n.gettext('Number of Add-ons')}</dt>
            <dd>
              {user ? user.num_addons_listed : <LoadingText />}
            </dd>
          </dl>

          {user && user.biography && user.biography.length ? (
            <div
              dangerouslySetInnerHTML={sanitizeUserHTML(user.biography, ['p'])}
            />
          ) : null}

          <p>
            {/*
              TODO: Make a `searchLink` component/helper that adds platform,
              etc. to the link/query params.
            */}
            {user && user.username ? (
              <Link to={`/search/?author=${user.username}`}>
                {i18n.gettext('See all add-ons by this author')}
              </Link>
            ) : <LoadingText />}
          </p>
        </Card>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default compose(
  connect(mapStateToProps),
  translate(),
  withErrorHandler({ name: 'UserProfile' }),
)(UserProfileBase);

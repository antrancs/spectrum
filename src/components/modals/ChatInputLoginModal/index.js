// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import Link from 'src/components/link';
import { closeModal } from 'src/actions/modals';
import ModalContainer from '../modalContainer';
import { modalStyles } from '../styles';
import LoginButtonSet from 'src/components/loginButtonSet';
import { Container, CodeOfConduct } from './style';
import { track, events } from 'src/helpers/analytics';
import type { Dispatch } from 'redux';

type Props = {
  dispatch: Dispatch<Object>,
  isOpen: boolean,
  modalProps: any,
};

class ChatInputLoginModal extends React.Component<Props> {
  close = () => {
    this.props.dispatch(closeModal());
  };

  componentDidMount() {
    const redirectPath = `${window.location.href}`;
    track(events.LOGIN_MODAL_VIEWED, { redirectPath });
  }

  render() {
    const { isOpen } = this.props;

    const styles = modalStyles(480);
    const redirectPath = `${window.location.href}`;
    const signinType = 'signin';

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Sign in'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={styles}
        closeTimeoutMS={330}
      >
        {/*
          We pass the closeModal dispatch into the container to attach
          the action to the 'close' icon in the top right corner of all modals
        */}
        <ModalContainer title={'Sign in'} closeModal={this.close}>
          <Container data-cy="login-modal">
            <LoginButtonSet
              redirectPath={redirectPath}
              signinType={signinType}
            />

            <CodeOfConduct>
              By using Spectrum, you agree to our{' '}
              <a
                href="https://github.com/withspectrum/code-of-conduct"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track(events.CODE_OF_CONDUCT_CLICKED, { location: 'login' })
                }
              >
                Code of Conduct
              </a>
              {', '}
              <Link to={'/privacy'}>Privacy Policy</Link>
              {', and '}
              <Link to={'/terms'}>Terms of Service</Link>.
            </CodeOfConduct>
          </Container>
        </ModalContainer>
      </Modal>
    );
  }
}

const map = state => ({
  isOpen: state.modals.isOpen,
  modalProps: state.modals.modalProps,
});

// $FlowIssue
export default compose(connect(map))(ChatInputLoginModal);

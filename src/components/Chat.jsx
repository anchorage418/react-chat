import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import map from 'lodash/map';
import { socket } from 'sockets'
import CN from 'classnames';

import { chatStyles } from 'styles';

class Chat extends Component {
  state = {
    currentSocketId: null,
    value: '',
    messages: []
  };

  componentDidMount() {
    socket.on('connect', () => {
      this.setState({ currentSocketId: socket.id });
    });

    socket.on('chat message', ({ message, userId }) => {
      console.log('Get message from server!', message);
      const updatedMsgList = this.state.messages;
      updatedMsgList.push({ message, id: userId });
      this.setState({ messages: updatedMsgList })
    });
  }

  handleTyping = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleFormSubmit = (e) => {
    const { messages, value, currentSocketId } = this.state;
    e.preventDefault();
    if (value) {
      const updatedMsgList = messages;
      updatedMsgList.push({ message: value, id: currentSocketId });
      this.setState({ messages: updatedMsgList });
      socket.emit('chat message', value);
      this.chatInputRef.value = '';
    }
  };

  renderMessages = () => {
    const { messages, currentSocketId } = this.state;
    const { classes } = this.props;
    return messages[0] ? map(messages, ({ message, id }, i) => {
      return (
        <div
          className={ CN(classes.messageItem, { [classes.secondary]: currentSocketId !== id }) }
          key={ `message__${i}` }
        >
          { message }
        </div>
      );
    }) : null;
  };

  render() {
    // const { messages, value } = this.state;
    const { classes } = this.props;

    console.log('chat state', this.state);

    return (
      <div>
        <div className={ classes.chatBoard }>
          { this.renderMessages() }
        </div>
        <form onSubmit={ this.handleFormSubmit }>
          <div className={ classes.chatInputContainer }>
            <Input
              onChange={ this.handleTyping }
              inputRef={ node => this.chatInputRef = node }
              placeholder="Type message here"
              fullWidth
              disableUnderline
            />
            <Button type="submit" variant="contained">Send</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(chatStyles)(Chat);

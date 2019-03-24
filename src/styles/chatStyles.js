export default () => ({
  chatBoard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '50vh',
    border: '2px solid #000'
  },
  chatInputContainer: {
    display: 'flex',
    border: '2px solid #000'
  },
  messageItem: {
    display: 'inline-flex',
    width: 'auto',
    maxWidth: '40%',
    marginBottom: '10px',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: 20,
    backgroundColor: '#063fcf',
    color: '#fff',
  },
  secondary: {
    alignSelf: 'flex-end',
    backgroundColor: '#cf065e'
  }
});

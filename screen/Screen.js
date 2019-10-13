import MainContact from '../components/MainContact';
import EditContact from '../components/EditContact';
import AddContact from '../components/AddContact';

const Screens = {
  Main: {
    key: 'mainScreen',
    component: MainContact,
    hideNavBar: true
  },
  addContact: {
    key: 'addContactScreen',
    component: AddContact,
    hideNavBar: true
  },
  editContact: {
    key: 'editContactScreen',
    component: EditContact,
    hideNavBar: true
  }
};
export default Screens;
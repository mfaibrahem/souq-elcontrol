import { useState, createContext } from 'react';

const INITIAL_VALUES = {
  isLoading: false,
  setIsLoading: (v) => {},
  modalOpened: false,
  setModalOpened: (v) => {},
  fetchCount: 0,
  setFetchCount: (v) => {},
  allFetchedMessages: [],
  setAllFetchedMessages: (v) => {},
  selectedMessage: null,
  setSelectedMessage: (v) => {}
};

const ContactSellerContext = createContext(INITIAL_VALUES);

export const ContactSellerProvider = ({ children }) => {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(INITIAL_VALUES.isLoading);
  const [fetchCount, setFetchCount] = useState(INITIAL_VALUES.fetchCount);
  const [allFetchedMessages, setAllFetchedMessages] = useState(
    INITIAL_VALUES.allFetchedMessages
  );
  const [selectedMessage, setSelectedMessage] = useState(
    INITIAL_VALUES.selectedMessage
  );

  const [modalOpened, setModalOpened] = useState(INITIAL_VALUES.modalOpened);

  return (
    <ContactSellerContext.Provider
      value={{
        isLoading,
        setIsLoading,
        modalOpened,
        setModalOpened,
        fetchCount,
        setFetchCount,
        allFetchedMessages,
        setAllFetchedMessages,
        selectedMessage,
        setSelectedMessage,
        isSubmittingForm,
        setIsSubmittingForm
      }}
    >
      {children}
    </ContactSellerContext.Provider>
  );
};

export default ContactSellerContext;

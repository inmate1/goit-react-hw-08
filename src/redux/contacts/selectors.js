import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter, selectNumberFilter } from "../filters/selectors";

export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectNumberFilter],
  (contacts, findNameContacts, findNumberContacts) => {
    return contacts?.filter(
      contact =>
        contact.name.toLowerCase().includes(findNameContacts.toLowerCase()) &&
        contact.number.includes(findNumberContacts)
    );
  }
);

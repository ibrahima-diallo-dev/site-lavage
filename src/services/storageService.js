/**
 * storageService.js
 * Abstraction layer for data persistence.
 * Currently uses LocalStorage, but designed to easily swap with API calls.
 */

const KEYS = {
  TESTIMONIALS: 'cw_testimonials',
  GALLERY: 'cw_gallery',
  CONTACT_MSGS: 'cw_messages'
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const StorageService = {
  // Generic Get
  get: async (key) => {
    await delay(300); // Simulate network latency
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  // Generic Save
  save: async (key, data) => {
    await delay(300);
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  },

  // Typed Helpers
  getTestimonials: async () => {
    return (await StorageService.get(KEYS.TESTIMONIALS)) || [];
  },
  
  addTestimonial: async (testimonial) => {
    const current = await StorageService.getTestimonials();
    const newItem = { ...testimonial, id: Date.now(), date: new Date().toISOString() };
    const updated = [newItem, ...current];
    await StorageService.save(KEYS.TESTIMONIALS, updated);
    return newItem;
  },

  saveMessage: async (message) => {
    const current = (await StorageService.get(KEYS.CONTACT_MSGS)) || [];
    const newItem = { ...message, id: Date.now(), status: 'new' };
    await StorageService.save(KEYS.CONTACT_MSGS, [...current, newItem]);
    return newItem;
  }
};

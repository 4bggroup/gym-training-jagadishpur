/* Configure one contact destination before launch. No credentials belong here.
 * whatsapp: an international-format number containing digits only, e.g. country code + number.
 * email: a public business email address.
 * endpoint: an HTTPS form endpoint accepting JSON; configure server-side validation, CORS and spam protection.
 * Delivery priority: endpoint, WhatsApp, email. Empty values enable the honest local preview.
 */
window.STRONGER_CONFIG = { whatsapp: '', email: '', endpoint: '' };

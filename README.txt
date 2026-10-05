STRONGER HOWRAH — V15
====================

OPEN THE WEBSITE
----------------
Extract the full ZIP, open the stronger-howrah-v15 folder and open index.html.
Keep the assets folder beside index.html. No install or build step is needed.
For a quick preview, the separately supplied stronger-howrah-v15-standalone.html
contains the CSS, JavaScript, photographs, icons and fonts in one file.

EDIT THE SOURCE
---------------
index.html                     Page structure and English content
assets/css/style.css           Main design and animations
assets/css/responsive.css      Tablet and mobile layouts
assets/css/fonts.css           Local font definitions
assets/js/main.js              Menus, tabs, dialogs, gallery and enquiries
assets/js/config.js            Public contact destination configuration
assets/images/                 Eleven distinct, locally hosted WebP photographs
assets/icons/                  Brand mark and favicon
assets/fonts/                  Local fonts and their OFL licence files

DESIGN AND INTERACTIONS
-----------------------
- Charcoal, clean white and electric orange visual system.
- Bold condensed headings and readable Manrope body typography.
- Split hero with an Indian gym photograph and a diagonal image edge.
- Animated ticker, scroll reveals, image hover zoom and reading progress.
- Programme detail dialogs and a keyboard-controlled four-week plan.
- Interactive session explorer with five stages.
- Three-photo gallery with enlargement and previous/next navigation.
- Native FAQ accordions, fixed navigation and mobile enquiry shortcut.
- Reduced-motion support, keyboard focus styles and dialog Escape support.
- Eleven different images; each appears once in the main page. The gallery
  intentionally reuses its selected thumbnail in the enlargement dialog.
- All website images and fonts load locally; no CDN or external library needed.
- Footer credit: Created by Sourav Show.

ENQUIRY DELIVERY
----------------
The supplied demo does not send or store enquiries on a server.
It validates the visitor's details, shows an enquiry preview and allows a text
download. It never claims an enquiry was sent when no contact is configured.

To enable contact, edit assets/js/config.js. Choose one:
  whatsapp: real business number, digits only, including country code.
  email: real public business email address.
  endpoint: HTTPS URL for a server that accepts a JSON POST.

Priority if multiple destinations are configured: endpoint > WhatsApp > email.
WhatsApp/email creates a draft for the visitor to review and send. For a server
endpoint, a successful HTTP response is treated as acceptance; your backend
must only return success after accepting the request. Add server validation,
spam protection and any required privacy notice. Do not put secrets in config.js.
Delivery success and failure states were tested with a mocked endpoint; no live
business endpoint, WhatsApp number or email address was provided or tested.

PHOTOGRAPHY AND BUSINESS DETAILS
--------------------------------
PHOTO_SOURCES.json records the source URLs. Nine source photographs were
retained from the supplied v14 project and two Unsplash photographs were added.
No AI-generated images were created for this update. These are stock photos,
not verified photos of the actual Howrah studio, trainer or customers.
Replace them with approved venue and trainer photos when available.

Exact venue address, fees, session availability, trainer name and credentials
were not supplied. The page invites visitors to confirm these by enquiry.
No invented testimonials, member counts or transformation guarantees were added.

ORIGINAL V14 ANALYSIS
---------------------
The original ZIP was about 40 KB of uncompressed HTML/CSS/JS and icons. It had
no photograph files or local fonts; all nine photographs depended on external
Unsplash URLs. Small navigation and label text, very large repeated headings,
long rows and fixed-height images weakened readability and page rhythm.
The FAQ used a fixed maximum opening height and the mobile menu had limited
keyboard behaviour. Its form always displayed a demo message, then cleared the
fields, without delivering an enquiry. The footer omitted the requested credit.

V15 rebuilds the composition, copy, image roles, typography and interactions.
It packages the actual images, replaces the fixed-height FAQ with native
accordions, improves keyboard behaviour and makes enquiry delivery explicit.

DEPLOYMENT
-----------
Upload the contents of stronger-howrah-v15 to the document root of a static
host, or place them together in a project folder. Use index.html as the entry.
Relative asset paths support subfolder hosting such as GitHub Pages.
This delivery is source code and files; it has not been published to a live URL.

VALIDATION
-----------
See QA_REPORT.json for browser checks, viewport widths and known limitations.

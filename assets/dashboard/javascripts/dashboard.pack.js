import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import Turbolinks from 'turbolinks';
Turbolinks.start();

// TODO: Include as packages
require('../vendor/semantic-ui/semantic.min');
require('../vendor/jquery.tablesort');

require('./dashboard/ace');
require('./dashboard/autosave');
require('./dashboard/datepicker');
require('./dashboard/hideMessage');
require('./dashboard/range');
require('./dashboard/semantic');
require('./dashboard/sidebar');
require('./dashboard/sortable');
require('./dashboard/websocket');
require('./dashboard/wysiwyg');

// CSRF
$.ajaxSetup({
  headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});

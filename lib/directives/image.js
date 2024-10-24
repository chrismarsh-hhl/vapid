import { Utils } from '../utils/index.js';

/**
 * Defaults
 *
 * @attr {string} [class=''] - <img> class attribute
 * @attr {string} [alt=''] - <img> alt attribute
 * @options {boolean} [tag=true] - render <img> or return raw src
 */
const DEFAULTS = {
  attrs: {
    class: '',
    alt: '',
    width: '',
    height: '',
  },
  options: {
    tag: true,
  },
};

const imageFunction = (BaseDirective) => {
  /*
   * Upload and render images
   */
  class ImageDirective extends BaseDirective {
    /**
     * @static
     *
     * @return {Object} default attrs and options
     */
    static get DEFAULTS() {
      return DEFAULTS;
    }

    /**
     * Renders inputs necessary to upload, preview, and optionally remove images
     *
     * @param {string} name
     * @param {string} [value=this.options.default]
     * @return {string} rendered HTML
     *
     * eslint-disable class-methods-use-this
     */
    input(name, value = '') {
      const inputs = `<input type="file" name="${name}" accept="image/*">
                    <input type="hidden" name="${name}" value="${value}">`;
      const preview = value
        ? `<img class="preview" src="/uploads/${value}">`
        : '';
      const destroy =
        !this.attrs.required && preview
          ? `<div class="ui checkbox">
             <input type="checkbox" name="${name.replace('content', '_destroy')}">
             <label>Delete</label>
           </div>`
          : '';

      return `
        <div class="previewable">
          ${inputs}
          ${preview}
          ${destroy}
        </div>`;
    }

    /**
     * Renders <img> tag or raw src
     *
     * @param {string} fileName
     * @return {string}
     */
    render(fileName) {
      if (!fileName) return null;

      if (this.options.tag) {
        return `<img src="/uploads/${fileName}${this._queryString}" ${this._tagAttrs}>`;
      }

      return `/uploads/${fileName}${this._queryString}`;
    }

    /**
     * A preview of the image
     *
     * @param {string} fileName
     * @return {string}
     */
    preview(fileName) {
      // Always render a tag
      this.options.tag = true;
      return this.render(fileName);
    }

    /**
     * @private
     *
     * Converts attrs to img tag attrs
     *
     * @return {string}
     */
    get _tagAttrs() {
      return Object.keys(this.attrs)
        .map((key) => {
          const val = this.attrs[key];
          return val && `${key}="${Utils.escape(val)}"`;
        })
        .filter(Boolean)
        .join(' ');
    }

    /**
     * @private
     *
     * Converts width/height to a query string
     *
     * @return {string}
     */
    get _queryString() {
      const qs = ['width', 'height']
        .map((key) => {
          const val = this.attrs[key];
          return val && `${key[0]}=${Number(val)}`;
        })
        .filter(Boolean)
        .join('&');
      return qs ? `?${qs}` : '';
    }
  }

  return ImageDirective;
};

export default imageFunction;

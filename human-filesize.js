import { PolymerElement } from '@polymer/polymer/polymer-element';
/**
 * `human-filesize`
 * Converts bytes to human readable format
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class HumanFilesize extends PolymerElement {
  static get is() {
    return 'human-filesize';
  }

  static get properties() {
    return {
      bytes: {
        type: Number,
      },
      decimals: {
        type: Number,
        value: () => 1,
      },
      useSi: {
        type: Boolean,
        value: () => false,
      },
      formattedSize: {
        type: String,
        notify: true,
      },
    };
  }

  static get observers() {
    return [
      '__calculateFormattedSize(bytes, useSi, decimals)',
    ];
  }

  __calculateFormattedSize(bytes, useSi, decimals) {
    if (typeof bytes === 'undefined' || Number.isNaN(bytes)) {
      this.set('formattedSize', null);
    } else {
      this.set('formattedSize', HumanFilesize.__humanFileSize(bytes, useSi, decimals));
    }
  }

  static __humanFileSize(bytes, si, decimals) {
    let result = bytes;
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return `${bytes}`;
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      result /= thresh;
      u += 1;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return `${result.toFixed(decimals)} ${units[u]}`;
  }
}

window.customElements.define(HumanFilesize.is, HumanFilesize);

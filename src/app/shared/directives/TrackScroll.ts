import {Directive, ElementRef} from "@angular/core";

/**
 * Created by yourilefers on 14-08-16.
 */
@Directive({
    selector: '[track-scroll]',
    host: {'(window:scroll)': 'track($event)'},
})
export class TrackScrollDirective {

    constructor(private _el: ElementRef) {
        console.log('scroll construct', _el);
       // _el.nativeElement.
    }

    public track(event) {
        console.debug("Scroll Event", event);
    }
}

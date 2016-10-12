import * as application from 'application';
import * as platform from 'platform';


/**
 * Creates an Android-style Toast notification.
 */
export class Toast {

    public static showToast(message: string): void {
        if( platform.isAndroid ) {
            let Toast = android.widget.Toast;
            Toast.makeText(application.android.context, message, Toast.LENGTH_LONG).show();
        } else {
            let msg: string = 'The Toast class for diplaying ephemeral messages does not support iOS at this time.';
            console.error(msg);
            // throw Error(msg);
        }
    }
}
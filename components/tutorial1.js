/**
 * Created by Franz on 18.05.2016.
 */

ccm.component({
    name: 'tutorial1',
    config: {
        html:  [ ccm.store, { local: './json/tutorial.json' } ],
        key: 'test',
        store:[ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'chat' } ],
        style: [ ccm.load, './css/tutorial.css' ],
        user:  [ ccm.instance, 'http://kaul.inf.h-brs.de/ccm/components/user.js' ]
    },
    Instance: function () {
        var self = this;
        self.init = function ( callback ) {
            self.store.onChange = function () { self.render(); };
            callback();
        };
        self.render = function ( callback ) {
            var element = ccm.helper.element( self );
            self.store.get( self.key, function ( dataset ) {
                if ( dataset === null )
                    self.store.set( { key: self.key, messages: [] }, proceed );
                else
                    proceed( dataset );
                function proceed( dataset ) {
                    element.html( ccm.helper.html( self.html.get( 'main' ) ) );
                    var messages_div = ccm.helper.find( self, '.messages' );
                    for ( var i = 0; i < dataset.messages.length; i++ ) {
                        messages_div.append( ccm.helper.html( self.html.get( 'message' ), {
                            name: ccm.helper.val( message.user ),
                            text: ccm.helper.val( message.text )
                        }  ) );
                    }
                    messages_div.append( ccm.helper.html( self.html.get( 'input' ), {
                        onsubmit: function () {
                            var value = ccm.helper.val( ccm.helper.find( self, 'input' ).val().trim() );
                            if ( value === '' ) return;
                            dataset.messages.push( { user: self.user.data().key, text: value } );
                            self.store.set( dataset, function () { self.render(); } );
                            return false;
                        }
                    } ) );
                    if ( callback ) callback();
                }
            } );
        }
    }
} );

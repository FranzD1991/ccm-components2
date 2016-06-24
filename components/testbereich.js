
/** ccm.chat.js */
ccm.component( {
    name: 'testbereich',
    config: {                    // Standardkonfiguration für ccm-Instanzen
        html:  [ ccm.store, { local: './json/testbereich.json' } ],
        key: 'test',  // Standardwert für den Schlüssel des zu visualisierenden Datensatzes
        store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'chattestfdahma2s' } ],
        style: [ ccm.load, './css/testbereich.css' ],
        user:  [ ccm.instance, 'http://kaul.inf.h-brs.de/ccm/components/user2.js' ]
    },
    Instance: function () {
        var self = this;
        self.init = function ( callback ) {
            self.store.onChange = function () { self.render(); };
            callback();
        };
        self.render = function ( callback ) {
            var element = ccm.helper.element( self );

            // Laden der bereits vorhandenen Daten
            self.store.get( self.key, function ( dataset ) {

                // Falls keine Daten vorhanden
                if ( dataset === null )
                    self.store.set( { key: self.key, messages: [] }, proceed );
                else
                    // Daten vorhanden
                    proceed( dataset );

                // Vorhandene Daten laden
                function proceed( dataset ) {
                    element.html( ccm.helper.html( self.html.get( 'main' ) ) );
                    var messages_div = ccm.helper.find( self, '.messages' );//hier statt messages manager
                    for ( var i = 0; i < dataset.messages.length; i++ ) {
                        var message = dataset.messages[ i ];
                        messages_div.append( ccm.helper.html( self.html.get( 'message' ), { //userstory ansteuern
                            name: message.user,
                            text: message.text
                        } ) );
                    }

                    messages_div.append( ccm.helper.html( self.html.get( 'input' ), {  // Anhängen des
                        onsubmit: function () {
                            var value = ccm.helper.val( ccm.helper.find( self, 'input' ).val().trim() );
                            if ( value === '' ) return;
                            self.user.login( function () {  // Nutzung der user-Instanz für Authentifizierung
                                dataset.messages.push( { user: self.user.data().key, text: value } );
                                self.store.set( dataset, function () { self.render(); } );
                            } );
                            return false;
                        }                              // input-Templates
                    } ) );
                    if ( callback ) callback();
                }
            } );
            if ( callback ) callback();
        }

    }


} );
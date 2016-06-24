
/** ccm.chat.js */
ccm.component( {
    name: 'userstorymanager2',
    config: {                    // Standardkonfiguration für ccm-Instanzen
        html:  [ ccm.store, { local: './json/userstorymanager.json' } ],
        key: 'test',  // Standardwert für den Schlüssel des zu visualisierenden Datensatzes
        store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'chattestfdahma2s2' } ],
        //style: [ ccm.load, './css/userstorystyle.css' ],
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
                    self.store.set( { key: self.key, manager: [] }, proceed );
                else
                // Daten vorhanden
                    proceed( dataset );

                // Vorhandene Daten laden
                function proceed( dataset ) {
                    element.html( ccm.helper.html( self.html.get( 'main' ) ) );
                    var userstories_div = ccm.helper.find( self, '.manager' );
                    for ( var i = 0; i < dataset.manager.length; i++ ) {
                        var userstory = dataset.manager[ i ];
                        userstories_div.append( ccm.helper.html( self.html.get( 'userstory' ), {
                            name:  userstory.user,
                            headline: userstory.headline,
                            description: userstory.description,
                            effort: userstory.effort,
                            wert: userstory.wert,
                            priority: userstory.priority
                        } ) );
                    }

                    userstories_div.append( ccm.helper.html( self.html.get( 'input' ), {
                        onsubmit: function () {
                            var ueber = ccm.helper.val( ccm.helper.find( self, '#ueberschrift' ).val().trim() );
                            var beschreibun = ccm.helper.val( ccm.helper.find( self, '#beschreibung' ).val().trim() );
                            var aufwan = ccm.helper.val( ccm.helper.find( self, '#aufwand' ).val().trim() );
                            var wertvol = ccm.helper.val( ccm.helper.find( self, '#wertvoll' ).val().trim() );
                            var prioritae = ccm.helper.val( ccm.helper.find( self, '#prioritaet' ).val().trim() );
                            if ( ueber === '' ) return;
                            self.user.login( function () {  // Nutzung der user-Instanz für Authentifizierung
                                dataset.manager.push( {
                                    user: self.user.data().key,
                                    headline: ueber,
                                    description: beschreibun,
                                    effort: aufwan,
                                    wert: wertvol,
                                    priority: prioritae
                                } );
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
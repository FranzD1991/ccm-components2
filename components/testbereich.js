
/** ccm.chat.js */
ccm.component( {
    name: 'testbereich',
    config: {                    // Standardkonfiguration für ccm-Instanzen
        html:  [ ccm.store, { local: './json/testbereich.json' } ],
        key: 'test',  // Standardwert für den Schlüssel des zu visualisierenden Datensatzes
        store: [ ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'chattestfdahma2s5' } ],
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

                    //Delete Block laden
                    userstories_div.append( ccm.helper.html( self.html.get( 'deleteus' ), {
                        onsubmit: function () {
                            var id = ccm.helper.val( ccm.helper.find( self, '#us-delete-id' ).val().trim() );
                            if ( id === '' ) return;
                            self.deleteStory(id);
                            return false;
                        }                              // input-Templates
                    } ) );

                    userstories_div.append( ccm.helper.html( self.html.get( 'input' ), {
                        onsubmit: function () {
                            var headline = ccm.helper.val( ccm.helper.find( self, '#headline' ).val().trim() );
                            var description = ccm.helper.val( ccm.helper.find( self, '#description' ).val().trim() );
                            var effort = ccm.helper.val( ccm.helper.find( self, '#effort' ).val().trim() );
                            var wert = ccm.helper.val( ccm.helper.find( self, '#wert' ).val().trim() );
                            var priority = ccm.helper.val( ccm.helper.find( self, '#priority' ).val().trim() );
                            if ( headline === '' ) return;
                            self.user.login( function () {
                                var timestamp = Math.floor(((Math.random() + new Date().getUTCMilliseconds()) * new Date().getUTCMilliseconds()));
                                self.store.set( {
                                        key: timestamp,
                                        user: self.user.data().key,
                                        headline: headline,
                                        description: description,
                                        effort: effort,
                                        wert: wert,
                                        priority: priority },
                                    function () {
                                        dataset.manager.push(timestamp);
                                        self.store.set( dataset, function () { self.render(); } );
                                    } );
                            } );
                            return false;
                        }                              // input-Templates
                    } ) );

                    for ( var i = 0; i < dataset.manager.length; i++ ) {
                        var userstory = dataset.manager[ i ];
                        self.store.get(userstory, function (data) {
                            userstories_div.append( ccm.helper.html( self.html.get( 'userstory' ), {
                                key:  data.key,
                                name:  data.user,
                                headline: data.headline,
                                description: data.description,
                                effort: data.effort,
                                wert: data.wert,
                                priority: data.priority
                            } ) );
                        });
                    }

                    if ( callback ) callback();
                }
            } );
            if ( callback ) callback();
        };

        //delete Userstory funktion
        self.deleteStory = function (storyId) {
            self.store.del(storyId, function () {
                self.store.get(self.key, function (data) {
                   for (var i = 0; i < data.manager.length; i++) {
                       if(data.manager[i] == storyId) {
                           data.manager.splice(i, 1);
                           self.store.set(data, function () {
                               console.log('userstory deleted');
                               self.render();
                           });
                           break;
                       }
                   }
                });
            });
        };

    }


} );
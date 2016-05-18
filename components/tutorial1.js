/**
 * Created by Franz on 18.05.2016.
 */

ccm.component({
    name: 'tutorial1',
    config: {
        key: 'test',
        store:[ccm.store, { url: 'ws://ccm2.inf.h-brs.de/index.js', store: 'chat' } ]
    },
    Instance: function () {
        this.render=function(callback){
            var element = ccm.helper.element( this );
            this.store.get( this.key, function ( dataset ) {
                if ( callback ) callback();
            } );
            if(callback) callback();
        }
    }
});
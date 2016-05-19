ccm.component({
    name: 'userstorybuilder',
    config: {
        html:  [ ccm.store, { local: './json/userstorybuilder.json' } ],
        key: 'test',
        style: [ ccm.load, './css/tutorial.css' ],
    },
    Instance: function () {
        this.render=function(callback){
            ccm.helper.element(this);
            var element = ccm.helper.element( this );
            element.html( 'Hello, World!' );
            if(callback) callback();
        }
    }
});
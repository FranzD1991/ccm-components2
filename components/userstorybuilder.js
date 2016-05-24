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
            
            var n=0;
            var us= [];

            function Userstory(hl,des,prio,eff,va){
                this.hl = hl;
                this.des = des;
                this.prio = prio;
                this.eff = eff;
                this.va =va;
            }
            
            function testInsert(){
                
            }
            
            function submitUS() {
                us[n]=userstory(1,2,3,4,5);
                n++;
            }

            function deleteUS() {
                
            }
            
            function getUS() {
                
            }

            function showallUS() {

            }
            if(callback) callback();
        }
    }
});
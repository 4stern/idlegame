'use strict';

/**
 * @ngdoc service
 * @name idlegameApp.thegame
 * @description
 * # thegame
 * Factory in the idlegameApp.
 */
angular.module('idlegameApp')
  .factory('thegame', ['$interval','$timeout',function ($interval,$timeout) {

    var value = 10,
        cycleDuration = 100,
        callback = null;

        window.cheat=function(n){
          value += n || 10000000;
        };

    var modifiers = [
      {name:'Einfache Schläger',  level:0, duration:2000, durationPer100:0, durationCounter:0, cost:1, earnPerCycle: 1, nextLevelMultipliers:{cost: 1.3, earnPerCycle:1.1}},
      {name:'Schlägertrupps',     level:0, duration:3000, durationPer100:0, durationCounter:0, cost:10, earnPerCycle: 10, nextLevelMultipliers:{cost: 1.5, earnPerCycle:1.2}},
      {name:'Bewaffnete Trupps',  level:0, duration:4000, durationPer100:0, durationCounter:0, cost:1000, earnPerCycle: 100, nextLevelMultipliers:{cost: 1.6, earnPerCycle:1.3}},
      {name:'Gruppenführer',      level:0, duration:5000, durationPer100:0, durationCounter:0, cost:35000, earnPerCycle: 1000, nextLevelMultipliers:{cost: 1.7, earnPerCycle:1.4}},
      {name:'Boss',               level:0, duration:6000, durationPer100:0, durationCounter:0, cost:1000000, earnPerCycle: 10000, nextLevelMultipliers:{cost: 1.8, earnPerCycle:1.5}}
    ];

    function run(){
      var self = this;

      function _run(){


        if(self.intv){
          self.durationCounter = 0;
          self.durationPer100 = 0;
          $interval.cancel(self.intv);
        }


        self.intv = $interval(function(){
          self.durationCounter += self.duration / cycleDuration;
          self.durationPer100 = self.durationCounter*cycleDuration/self.duration;
          if(callback){
            callback();
          }
        },self.duration/cycleDuration);


        if(self.level > 0){
          value = value + self.earnPerCycle;
          if(callback){
            callback();
          }
        }

        self.running = $timeout(_run,self.duration);
      };
      
      self.running = true;
      _run();
    };

    function upgrade(){
      if(this.cost <= value){
        value -= this.cost;
        this.cost = this.cost * this.nextLevelMultipliers.cost;
        this.earnPerCycle = this.earnPerCycle * this.nextLevelMultipliers.earnPerCycle;

        if(this.level>8 && (this.level+1)%10 == 0){
          var tmp = this.duration / 2;
          tmp = ~~tmp;
          if(tmp <=200){
            tmp = 200;
          }
          this.duration = tmp;
        }

        this.level++;
        if(!this.running){
          this.run();
        }
      }
    };

    // Public API here
    return {
      get: function(){
        return value;
      },
      modifiers: modifiers,
      observe:function(fn){
          callback = fn;
      },
      upgrade:function(modifier){
        if(!modifier.upgrade){
          modifier.upgrade = upgrade;
        }
        if(!modifier.run){
          modifier.run = run;
        }
        modifier.upgrade();

      }
    };
  }]);

/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-26 22:27:44
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-06-01 08:56:29
 * @FilePath: \plant\src\utls\utl.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export interface dataType {
  ferti: number; //施肥
  pest: number; //农药
  sun: number; //阳光
  tempr: number; //温度
  water: number; //水分
}



export interface PlantCare {
  name:string;
  title: string;
  detail: string;
  lowestTempr: number;
  heightestTempr: number;
  lowestSun: number;
  heightestSun: number;
  water: number;
  ferti: number;
  pest: number;
}


export interface returnType {
  plantUrl: string;
  shiny: boolean; //是否有闪烁动画
  pest: boolean; //是否有虫子动画
}

export type toolType = "sun" | "tempr" | "water" | "ferti" | "pest";

/**
 * 判断下一个阶段
 * @param nowData
 * @param type
 * @param plantKind
 * @param plantPeriod
 * @returns
 */
export function judgePeriod(
  nowData: dataType,
  type: toolType | null,
  plantKind: number,
  plantPeriod: number
): returnType {
  //"/plants/1/1.jpg",
  let result = {
    plantPeriod: plantPeriod,
    shiny: false,
    pest: false,
  };

  if(plantPeriod===4){
   return {
    shiny: result.shiny,
    pest: result.pest,
    plantUrl: `plants/${plantKind}/${result.plantPeriod}.jpg`,
  };
  }

  let plantContent;
  switch (plantKind) {
    case 1:
      plantContent = strawberry;
      break;
    case 2:
      plantContent = tomato;
      break;
    case 3:
      plantContent = carrot;
      break;
    case 4:
      plantContent = eggplant;
      break;
    case 5:
      plantContent = sunflower;
      break;
    default:
      return {
        shiny: result.shiny,
        pest: result.pest,
        plantUrl: `/plants/${plantKind}/${result.plantPeriod}.jpg`,
      };
  }

  switch (type) {
    case "sun":
      if (
        nowData[type]  >= plantContent?.lowestSun &&
        nowData[type]  <= plantContent?.heightestSun
      ) {
        //光照合适
        result.shiny = true;
      } else if (nowData[type]  < plantContent?.lowestSun) {
        //小于光照，不生长
        result.shiny = true;
      } else if (nowData[type]  > plantContent?.heightestSun) {
        //大于光照，死亡
        result.plantPeriod = 4;
      }
      break;

    case "tempr":
      if (
        nowData[type]  >= plantContent.lowestTempr &&
        nowData[type]  <= plantContent.heightestTempr
      ) {
        result.shiny = true;
      } else if (nowData[type]  < plantContent.lowestTempr) {
        result.shiny = true;
      } else if (nowData[type]  > plantContent.heightestTempr) {
        // Too hot - plant dies
        result.plantPeriod = 4;
      }
      break;

    case "water":
      if (nowData[type]  > plantContent.water) {
        //大于浇水量，死亡
        result.plantPeriod = 4;
      } else if (nowData[type]  == plantContent.water) {
        //刚好合适的浇水量
        if (
          nowData.sun  >= plantContent?.lowestSun &&
          nowData.sun <= plantContent?.heightestSun
        )
          if (
            nowData.tempr  >= plantContent.lowestTempr &&
            nowData.tempr  <= plantContent.heightestTempr
          ) {
            if (plantPeriod == 1) {
              result.plantPeriod = 2;
            }
            break;
          }

        result.shiny = true;
      } else if (nowData[type] < plantContent.water) {
        //小于浇水量，不生长
        result.shiny = true;
      }
      break;
    case "ferti":
      if (nowData[type]  > plantContent.ferti) {
        result.plantPeriod = 4;
      } else if (nowData[type]  == plantContent.ferti) {
        if (plantPeriod == 2) {
          result.plantPeriod = 3;
          result.pest = true;
        }
      } else if (nowData[type] < plantContent.ferti) {
        result.shiny = true;
      }
      break;

    case "pest":
      if (nowData[type] > plantContent.pest) {
        result.plantPeriod = 4;
      } else if (nowData[type]  == plantContent.pest) {
        if (plantPeriod == 3) {
          result.pest = true; //如果是3阶段返回pest是true，意味着pest需要消失
        }else{
          result.plantPeriod = 4;
        }
      } else {
        result.shiny = true;
      }
      break;
  }

  return {
    shiny: result.shiny,
    pest: result.pest,
    plantUrl: `plants/${plantKind}/${result.plantPeriod}.jpg`,
  };
}
/**
 * 通过下标获取植物情况 index：1-5
 * @param index 
 * @returns 
 */
export function getPlantDetail(index:number){
  switch(index){
    case 1:
      return strawberry;
    case 2:
      return tomato;
    case 3:
      return carrot;
    case 4:
      return eggplant;
    case 5:
      return sunflower;
    default:
      return null
  }
}
const carrot: PlantCare = {
  name:'carrot',
  title: "Carrots Care Guide",
  detail: `<br/><b>1. Sunlight光照 ：</b>   They need 6-8 hours sunlight everyday. 每日6-8小时直射光.<br/><b>2. Temperature 温度：</b>   They love 20-25°C. 保持20-25℃，高温时早晚浇水降温。<br/><b>3. Water 浇水：</b>   We should water them two times a week.每周浇水2次，土壤干了就浇水，浇在根部，不是在叶子。清晨或傍晚浇水。<br/><b>4. Fertilizer施肥：</b>   We should fertilize them twice a month. 每月施肥两次。<br/><b>5. Pest control除虫：</b>   We should use bug spray anytime when we see the bugs. 蚜虫用1:500肥皂水喷洒叶面；地下害虫浇灌稀释肥皂水（1:10）到根部。`,
  lowestTempr: 20,
  heightestTempr: 25,
  lowestSun: 6,
  heightestSun: 8,
  water: 2, // times/week
  ferti: 2, // times/month
  pest: 1, // as needed
};

const eggplant: PlantCare = {
  name:'eggplant',
  title: 'Eggplant Care Guide',
  detail: `<br/><b>1. Sunlight 光照：</b>   They need 6–8 hours sunlight. 每天需要6-8小时充足阳光，光照不足会影响结果。<br/><b>2. Temperature 温度：</b>   They love 20–30°C. 适宜生长温度20-30℃，低于15℃生长缓慢。<br/><b>3. Watering 浇水：</b>   Water them 3 times a week. 每周浇水3次，保持土壤湿润但不要积水。最好在早晨浇水。<br/><b>4. Fertilizing施肥：</b>   We should fertilize them three times a month. 生长旺盛期每月施肥3次，花果期增施磷钾肥。<br/><b>5. Pest Control 除虫：</b>   We should use bug spray anytime when we see the bugs. 红蜘蛛用肥皂水(1:300)喷洒叶背；二十八星瓢虫人工捕捉并喷洒肥皂水(1:200)。`,
  lowestTempr: 20,
  heightestTempr: 30,
  lowestSun: 6,
  heightestSun: 8,
  water: 3, // times/week
  ferti: 3, // times/month
  pest: 1, // as needed
};

const sunflower: PlantCare = {
  name:'sunflower',
  title: "Sunflowers Care Guide",
  detail: `<br/><b>1. Sunlight 光照:</b>   They need 6-8 hours sunlight everyday. 每日全日照6-8小时，避免遮阴。<br/><b>2. Temperature 温度：</b>   They love 20-35°C. 耐高温但不耐涝，雨后及时排水。<br/><b>3. Water浇水：</b>   We should water them three times a week. 每周大约3次，土壤干了就浇水。清晨或傍晚浇水，避免高温灼伤花瓣，保持土壤微润，不要积水。<br/><b>4. Fertilizer施肥：</b>   We should fertilize them twice a month. 每月施肥两次。<br/><b>5. Pest control除虫：</b>   We should use bug spray anytime when we see the bugs. 蚜虫和螟虫用肥皂水（1:300）喷洒，重点喷花盘背面。`,
  lowestTempr: 20,
  heightestTempr: 35,
  lowestSun: 6,
  heightestSun: 8,
  water: 3, // times/week
  ferti: 2, // times/month
  pest: 1, // as needed
};

const tomato: PlantCare = {
  name:'tomato',
  title: "Tomatoes Care Guide",
  detail: `<br/><b>1. Sunlight 光照:</b>   They need 6-8 hours sunlight everyday. 每日全日照6-8小时。<br/><b>2. Temperature 温度：</b>   They love 15-30°C. 白天25-30℃，夜间15-18℃，高温时遮阴。<br/><b>3. Water浇水：</b>   Water them three times a week. 每周浇水三次左右，土壤干了就浇水。最好清晨或傍晚浇水，保持土壤湿度70%-80%.<br/><b>4. Fertilizer施肥：</b>   We should fertilize them three times a month. 花果期每10天施肥一次。<br/><b>5. Pest control除虫：</b>   We should use bug spray anytime when we see the bugs. 蚜虫用肥皂水（1:500）喷洒；棉铃虫浇灌稀释肥皂水（1:20）灌根。`,
  lowestTempr: 15,
  heightestTempr: 30,
  lowestSun: 6,
  heightestSun: 8,
  water: 3, // times/week
  ferti: 3, // times/month
  pest: 1, // as needed
};

const strawberry: PlantCare = {
  name:'strawberry',
  title: "Strawberries Care Guide",
  detail: `<br/><b>1. Sunlight 光照:</b>   They need 6-8 hours sunlight everyday. 每日6-8小时，避免强光直射。<br/><b>2. Temperature 温度：</b>   They love 15-22°C. 温度15-22°C的时候最好，夏天高于30度适当遮光处理。<br/><b>3. Water浇水：</b>   We should water them three times a week. 每周浇水三次左右，土壤干了就浇水。避免湿度过高引发病害。<br/><b>4. Fertilizer施肥：</b>   We should fertilize them three times a month. 花果期每10天施肥一次。<br/><b>5. Pest control除虫：</b>   We should use bug spray anytime when we see the bugs. 蚜虫和红蜘蛛用肥皂水（1:300）喷洒叶背；白粉虱浇灌稀释肥皂水（1:50）。`,
  lowestTempr: 15,
  heightestTempr: 22,
  lowestSun: 6,
  heightestSun: 8,
  water: 3, // times/week
  ferti: 3, // times/month
  pest: 1, // as needed
};
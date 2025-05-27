/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-26 22:27:44
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-27 23:23:30
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
 * @param beforeData
 * @param type
 * @param plantKind
 * @param plantPeriod
 * @returns
 */
export function judgePeriod(
  beforeData: dataType,
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
        beforeData[type] + 1 >= plantContent?.lowestSun &&
        beforeData[type] + 1 <= plantContent?.heightestSun
      ) {
        //光照合适
        result.shiny = true;
      } else if (beforeData[type] + 1 < plantContent?.lowestSun) {
        //小于光照，不生长
        result.shiny = true;
      } else if (beforeData[type] + 1 > plantContent?.heightestSun) {
        //大于光照，死亡
        result.plantPeriod = 4;
      }
      break;

    case "tempr":
      if (
        beforeData[type] + 1 >= plantContent.lowestTempr &&
        beforeData[type] + 1 <= plantContent.heightestTempr
      ) {
        result.shiny = true;
      } else if (beforeData[type] + 1 < plantContent.lowestTempr) {
        result.shiny = true;
      } else if (beforeData[type] + 1 > plantContent.heightestTempr) {
        // Too hot - plant dies
        result.plantPeriod = 4;
      }
      break;

    case "water":
      if (beforeData[type] + 1 > plantContent.water) {
        //大于浇水量，死亡
        result.plantPeriod = 4;
      } else if (beforeData[type] + 1 == plantContent.water) {
        //刚好合适的浇水量
        if (
          beforeData.sun + 1 >= plantContent?.lowestSun &&
          beforeData.sun + 1 <= plantContent?.heightestSun
        )
          if (
            beforeData.tempr + 1 >= plantContent.lowestTempr &&
            beforeData.tempr + 1 <= plantContent.heightestTempr
          ) {
            if (plantPeriod == 1) {
              result.plantPeriod = 2;
            }
            break;
          }

        result.shiny = true;
      } else if (beforeData[type] + 1 < plantContent.water) {
        //小于浇水量，不生长
        result.shiny = true;
      }
      break;
    case "ferti":
      if (beforeData[type] + 1 > plantContent.ferti) {
        result.plantPeriod = 4;
      } else if (beforeData[type] + 1 == plantContent.ferti) {
        if (plantPeriod == 2) {
          result.plantPeriod = 3;
          result.pest = true;
        }
      } else if (beforeData[type] + 1 < plantContent.ferti) {
        result.shiny = true;
      }
      break;

    case "pest":
      if (beforeData[type] + 1 > plantContent.pest) {
        result.plantPeriod = 4;
      } else if (beforeData[type] + 1 == plantContent.pest) {
        result.pest = true; //如果是3阶段返回pest是true，意味着pest需要消失
      } else {
        result.shiny = true;
      }
      break;
  }

  return {
    shiny: result.shiny,
    pest: result.pest,
    plantUrl: `/plants/${plantKind}/${result.plantPeriod}.jpg`,
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
  detail: `<b>1. Water 浇水：</b>\n   We should water them two times a week.每周浇水2次，土壤干了就浇水，浇在根部，不是在叶子。清晨或傍晚浇水。\n<b>2. Sunlight光照 ：</b>\n   They need 6-8 hours sunlight everyday. 每日6-8小时直射光.\n<b>3. Temperature 温度：</b>\n   They love 20-25°C. 保持20-25℃，高温时早晚浇水降温。\n<b>4. Fertilizer施肥：</b>\n   We should fertilize them twice a month. 每月施肥两次。\n<b>5. Pest control除虫：</b>\n   We should use bug spray anytime when we see the bugs. 蚜虫用1:500肥皂水喷洒叶面；地下害虫浇灌稀释肥皂水（1:10）到根部。`,
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
  detail: `<b>1. Watering 浇水：</b>\n   Water them 3 times a week. 每周浇水3次，保持土壤湿润但不要积水。最好在早晨浇水。\n<b>2. Sunlight 光照：</b>\n   They need 6–8 hours sunlight. 每天需要6-8小时充足阳光，光照不足会影响结果。\n<b>3. Temperature 温度：</b>\n   They love 20–30°C. 适宜生长温度20-30℃，低于15℃生长缓慢。\n<b>4. Fertilizing施肥：</b>\n   We should fertilize them three times a month. 生长旺盛期每月施肥3次，花果期增施磷钾肥。\n<b>5. Pest Control 除虫：</b>\n   We should use bug spray anytime when we see the bugs. 红蜘蛛用肥皂水(1:300)喷洒叶背；二十八星瓢虫人工捕捉并喷洒肥皂水(1:200)。`,
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
  detail: `<b>1. Water浇水：</b>\n   We should water them three times a week. 每周大约3次，土壤干了就浇水。清晨或傍晚浇水，避免高温灼伤花瓣，保持土壤微润，不要积水。\n<b>2. Sunlight 光照:</b>\n   They need 6-8 hours sunlight everyday. 每日全日照6-8小时，避免遮阴。\n<b>3. Temperature 温度：</b>\n   They love 20-35°C. 耐高温但不耐涝，雨后及时排水。\n<b>4. Fertilizer施肥：</b>\n   We should fertilize them twice a month. 每月施肥两次。\n<b>5. Pest control除虫：</b>\n   We should use bug spray anytime when we see the bugs. 蚜虫和螟虫用肥皂水（1:300）喷洒，重点喷花盘背面。`,
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
  detail: `<b>1. Water浇水：</b>\n   Water them three times a week. 每周浇水三次左右，土壤干了就浇水。最好清晨或傍晚浇水，保持土壤湿度70%-80%.\n<b>2. Sunlight 光照:</b>\n   They need 6-8 hours sunlight everyday. 每日全日照6-8小时。\n<b>3. Temperature 温度：</b>\n   They love 15-30°C. 白天25-30℃，夜间15-18℃，高温时遮阴。\n<b>4. Fertilizer施肥：</b>\n   We should fertilize them three times a month. 花果期每10天施肥一次。\n<b>5. Pest control除虫：</b>\n   We should use bug spray anytime when we see the bugs. 蚜虫用肥皂水（1:500）喷洒；棉铃虫浇灌稀释肥皂水（1:20）灌根。`,
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
  detail: `<b>1. Water浇水：</b>\n   We should water them three times a week. 每周浇水三次左右，土壤干了就浇水。避免湿度过高引发病害。\n<b>2. Sunlight 光照:</b>\n   They need 6-8 hours sunlight everyday. 每日6-8小时，避免强光直射。\n<b>3. Temperature 温度：</b>\n   They love 15-22°C. 温度15-22°C的时候最好，夏天高于30度适当遮光处理。\n<b>4. Fertilizer施肥：</b>\n   We should fertilize them three times a month. 花果期每10天施肥一次。\n<b>5. Pest control除虫：</b>\n   We should use bug spray anytime when we see the bugs. 蚜虫和红蜘蛛用肥皂水（1:300）喷洒叶背；白粉虱浇灌稀释肥皂水（1:50）。`,
  lowestTempr: 15,
  heightestTempr: 22,
  lowestSun: 6,
  heightestSun: 8,
  water: 3, // times/week
  ferti: 3, // times/month
  pest: 1, // as needed
};

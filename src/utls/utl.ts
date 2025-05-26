/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-26 22:27:44
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-27 00:26:26
 * @FilePath: \plant\src\utls\utl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export interface dataType {
  ferti: number; //施肥
  pest: number; //农药
  sun: number; //阳光
  tempr: number; //温度
  water: number; //水分
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
      return;
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

const carrot = {
  lowestTempr: 22,
  heightestTempr: 32,
  lowestSun: 5,
  heightestSun: 7,
  water: 4, //4次/day
  ferti: 4, //4/month
  pest: 1, //1/month
};

const strawberry = {
  lowestTempr: 22,
  heightestTempr: 32,
  lowestSun: 5,
  heightestSun: 7,
  water: 4, //4次/day
  ferti: 4, //4/month
  pest: 1, //1/month
};
const tomato = {
  lowestTempr: 22,
  heightestTempr: 32,
  lowestSun: 5,
  heightestSun: 7,
  water: 4, //4次/day
  ferti: 4, //4/month
  pest: 1, //1/month
};
const eggplant = {
  lowestTempr: 22,
  heightestTempr: 32,
  lowestSun: 5,
  heightestSun: 7,
  water: 4, //4次/day
  ferti: 4, //4/month
  pest: 1, //1/month
};
const sunflower = {
  lowestTempr: 22,
  heightestTempr: 32,
  lowestSun: 5,
  heightestSun: 7,
  water: 4, //4次/day
  ferti: 4, //4/month
  pest: 1, //1/month
};

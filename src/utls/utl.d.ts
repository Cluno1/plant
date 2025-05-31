export interface dataType {
    ferti: number;
    pest: number;
    sun: number;
    tempr: number;
    water: number;
}
export interface PlantCare {
    name: string;
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
    shiny: boolean;
    pest: boolean;
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
export declare function judgePeriod(nowData: dataType, type: toolType | null, plantKind: number, plantPeriod: number): returnType;
/**
 * 通过下标获取植物情况 index：1-5
 * @param index
 * @returns
 */
export declare function getPlantDetail(index: number): PlantCare | null;


/**
 * Configuration for SpotLight
 */
export interface GltfOptions {
    binary?: boolean;
}

/**
 * Create GLTF by Realistic3D
 */
export declare class GltfExporter {
    export(scene: BABYLON.Scene, options?: GltfOptions, ignoreList?:any[]) : any
}

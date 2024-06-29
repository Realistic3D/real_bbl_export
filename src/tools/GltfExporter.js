import {GLTF2Export} from "babylonjs-serializers";

export class GltfExporter {
    constructor() {
        this.error = undefined;
    }
    async export(scene, options = {}, ignoreList = []) {
        let expOptions = {
            shouldExportNode: (node) => {
                console.log(`Processing node: ${node.name}`);
                return !ignoreList.includes(node);
            },
            shouldExportTexture: () => true,
            exportLights: true,
            exportExtras: true
        };
        const buffers = await GLTF2Export.GLBAsync(scene, "Real3D", expOptions);
        await GLTF2Export.GLTFAsync(scene, "Real3D", expOptions).then(gltf => {
            gltf.downloadFiles();
        })
        return await this.exportGLB(buffers);
    }
    async exportGLB(buffers) {
        const files = buffers.glTFFiles;
        if(!files) return this.__setError("Failed to export scene!");
        const blob = files["Real3D.glb"];
        if(!blob) return this.__setError("Failed to create scene!");
        const buffer = await blob.arrayBuffer();
        return new Blob([buffer], {type: 'application/octet-stream'});
    }
    __setError(msg) {
        this.error = msg;
    }
}

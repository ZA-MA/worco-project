export const disableScaling = () => {
    document.addEventListener('mousewheel', function(e){
        // @ts-ignore
        if(!e.ctrlKey && !e.metaKey) return;

        e.preventDefault();
        e.stopImmediatePropagation();
    }, {passive:false});

    document.addEventListener('gesturestart', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
    }, {passive:false});
}
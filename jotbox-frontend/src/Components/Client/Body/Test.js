import React, { useRef, useState } from 'react';
import './Test.css';

export default function Test() {
    const [isLeftDragging, setIsLeftDragging] = useState(false);
    const [isRightDragging, setIsRightDragging] = useState(false);
    const pageRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    function resetColumnSizes() {
        // when page resizes return to default col sizes
        pageRef.current.style.gridTemplateColumns = '2fr 6px 6fr 6px 2fr';
    }

    function setCursor(cursor) {
        pageRef.current.style.cursor = cursor;
    }

    function startLeftDrag() {
        console.log('mouse down');
        setIsLeftDragging(true);
        setCursor('ew-resize');
    }

    function startRightDrag() {
        console.log('mouse down');
        setIsRightDragging(true);
        setCursor('ew-resize');
    }

    function endDrag() {
        console.log('mouse up');
        setIsLeftDragging(false);
        setIsRightDragging(false);
        setCursor('auto');
    }

    function onDrag(event) {
        if (isLeftDragging || isRightDragging) {
            console.log('Dragging');

            const page = pageRef.current;
            const leftcol = leftColRef.current;
            const rightcol = rightColRef.current;

            const leftColWidth = isLeftDragging ? event.clientX : leftcol.clientWidth;
            const rightColWidth = isRightDragging
                ? page.clientWidth - event.clientX
                : rightcol.clientWidth;

            const dragbarWidth = 6;

            const cols = [
                leftColWidth,
                dragbarWidth,
                page.clientWidth - 2 * dragbarWidth - leftColWidth - rightColWidth,
                dragbarWidth,
                rightColWidth,
            ];

            const newColDefn = cols.map((c) => c.toString() + 'px').join(' ');

            console.log(newColDefn);
            page.style.gridTemplateColumns = newColDefn;

            event.preventDefault();
        }
    }

    return (
        <div onResize={resetColumnSizes}>
            <div
                id="page"
                ref={pageRef}
                onMouseUp={endDrag}
                onMouseMove={onDrag}
            >
                <div id="leftcol" ref={leftColRef}>
                    Left Col
                </div>
                <div id="leftdragbar" onMouseDown={startLeftDrag}></div>
                <div id="tabpages">Tab Pages</div>
                <div id="rightdragbar" onMouseDown={startRightDrag}></div>
                <div id="rightcol" ref={rightColRef}>
                    Rightcol
                </div>
            </div>
        </div>
    );
}

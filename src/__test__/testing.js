import React,{useRef,useEffect}from "react";

function Counter() {
 /*  const inputRef = useRef(null); */
  const reference = useRef(null)
 /*  useEffect(() => {
    inputRef.current.focus(null);
  }, []);
 */
  return(<> 
       <button>rajat</button>
       <button>near</button>      
      <input type="text" placeholder="aki" name="aki"  ref={reference} />
        </>)
}
export default Counter;
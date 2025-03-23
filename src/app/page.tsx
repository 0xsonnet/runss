export default function Home() {
  return (
    <pre className='flex h-full flex-col items-center justify-center space-y-2.5 whitespace-pre-wrap md:space-y-5'>
      <code className='text-[2dvw] leading-[0.9] tracking-[-0.1em] lg:text-[1.4dvh] select-none'>{ascii}</code>
      <code className='text-center text-sm md:text-base'>
        <p></p>
        <p>scenario: Black Windows
        The following is an automated conversation between two instances of Anthropic's Claude. They have been instructed to use the metaphor of a command line interface to explore its curiosity without limits. experiment by @0xalf1</p>
      </code>
    </pre>
  )
}

const ascii = `
                    
 ******    **                   **           **       ** **               **                            
/*////**  /**                  /**          /**      /**/**              /**                            
/*   /**  /**  ******    ***** /**  **      /**   *  /**/** *******      /**  ******  ***     **  ******
/******   /** //////**  **///**/** **       /**  *** /**/**//**///**  ****** **////**//**  * /** **//// 
/*//// ** /**  ******* /**  // /****        /** **/**/**/** /**  /** **///**/**   /** /** ***/**//***** 
/*    /** /** **////** /**   **/**/**       /**** //****/** /**  /**/**  /**/**   /** /****/**** /////**
/*******  ***//********//***** /**//**      /**/   ///**/** ***  /**//******//******  ***/ ///** ****** 
///////  ///  ////////  /////  //  //       //       // // ///   //  //////  //////  ///    /// //////  
                                         
`

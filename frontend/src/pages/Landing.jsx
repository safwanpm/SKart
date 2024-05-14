// import React from 'react'
// import Navbar from '../components/Navbar'
// import Product from '../components/Product'

// function Landing() {
//   return (

//     <>
//   <style
//     dangerouslySetInnerHTML={{
//       __html:
//         "\n        .work-sans {\n            font-family: 'Work Sans', sans-serif;\n        }\n                \n        #menu-toggle:checked + #menu {\n            display: block;\n        }\n        \n        .hover\\:grow {\n            transition: all 0.3s;\n            transform: scale(1);\n        }\n        \n        .hover\\:grow:hover {\n            transform: scale(1.02);\n        }\n        \n        .carousel-open:checked + .carousel-item {\n            position: static;\n            opacity: 100;\n        }\n        \n        .carousel-item {\n            -webkit-transition: opacity 0.6s ease-out;\n            transition: opacity 0.6s ease-out;\n        }\n        \n        #carousel-1:checked ~ .control-1,\n        #carousel-2:checked ~ .control-2,\n        #carousel-3:checked ~ .control-3 {\n            display: block;\n        }\n        \n        .carousel-indicators {\n            list-style: none;\n            margin: 0;\n            padding: 0;\n            position: absolute;\n            bottom: 2%;\n            left: 0;\n            right: 0;\n            text-align: center;\n            z-index: 10;\n        }\n        \n        #carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,\n        #carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,\n        #carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {\n            color: #000;\n            /*Set to match the Tailwind colour you want the active one to be */\n        }\n    "
//     }}
//   />
//   <Navbar/>
//   <div
//     className="carousel relative container mx-auto"
//     style={{ maxWidth: 1600 }}
//   >
//     <div className="carousel-inner relative overflow-hidden w-full">
//       {/*Slide 1*/}
//       <input
//         className="carousel-open"
//         type="radio"
//         id="carousel-1"
//         name="carousel"
//         aria-hidden="true"
//         hidden=""
//         defaultChecked="checked"
//       />
//       <div
//         className="carousel-item absolute opacity-0"
//         style={{ height: "50vh" }}
//       >
//         <div
//           className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
//           style={{
//             backgroundImage:
//               'url("https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")'
//           }}
//         >
//           <div className="container mx-auto">
//             <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
//               <p className="text-black text-2xl my-4">
//                 Stripy Zig Zag Jigsaw Pillow and Duvet Set
//               </p>
//               <a
//                 className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
//                 href="#"
//               >
//                 view product
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <label
//         htmlFor="carousel-3"
//         className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
//       >
//         ‹
//       </label>
//       <label
//         htmlFor="carousel-2"
//         className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
//       >
//         ›
//       </label>
//       {/*Slide 2*/}
//       <input
//         className="carousel-open"
//         type="radio"
//         id="carousel-2"
//         name="carousel"
//         aria-hidden="true"
//         hidden=""
//       />
//       <div
//         className="carousel-item absolute opacity-0 bg-cover bg-right"
//         style={{ height: "50vh" }}
//       >
//         <div
//           className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
//           style={{
//             backgroundImage:
//               'url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM0MTM2fQ&auto=format&fit=crop&w=1600&q=80")'
//           }}
//         >
//           <div className="container mx-auto">
//             <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
//               <p className="text-black text-2xl my-4">Real Bamboo Wall Clock</p>
//               <a
//                 className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
//                 href="#"
//               >
//                 view product
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <label
//         htmlFor="carousel-1"
//         className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto"
//       >
//         ‹
//       </label>
//       <label
//         htmlFor="carousel-3"
//         className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto"
//       >
//         ›
//       </label>
//       {/*Slide 3*/}
//       <input
//         className="carousel-open"
//         type="radio"
//         id="carousel-3"
//         name="carousel"
//         aria-hidden="true"
//         hidden=""
//       />
//       <div
//         className="carousel-item absolute opacity-0"
//         style={{ height: "50vh" }}
//       >
//         <div
//           className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom"
//           style={{
//             backgroundImage:
//               'url("https://images.unsplash.com/photo-1519327232521-1ea2c736d34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")'
//           }}
//         >
//           <div className="container mx-auto">
//             <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
//               <p className="text-black text-2xl my-4">
//                 Brown and blue hardbound book
//               </p>
//               <a
//                 className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
//                 href="#"
//               >
//                 view product
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <label
//         htmlFor="carousel-2"
//         className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto"
//       >
//         ‹
//       </label>
//       <label
//         htmlFor="carousel-1"
//         className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto"
//       >
//         ›
//       </label>
//       {/* Add additional indicators for each slide*/}
//       <ol className="carousel-indicators">
//         <li className="inline-block mr-3">
//           <label
//             htmlFor="carousel-1"
//             className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
//           >
//             •
//           </label>
//         </li>
//         <li className="inline-block mr-3">
//           <label
//             htmlFor="carousel-2"
//             className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
//           >
//             •
//           </label>
//         </li>
//         <li className="inline-block mr-3">
//           <label
//             htmlFor="carousel-3"
//             className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
//           >
//             •
//           </label>
//         </li>
//       </ol>
//     </div>
//   </div>
//   {/*	 

// Alternatively if you want to just have a single hero

// <section class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right" style="max-width:1600px; height: 32rem; background-image: url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80');">

// 	<div class="container mx-auto">

// 		<div class="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
// 			<h1 class="text-black text-2xl my-4">Stripy Zig Zag Jigsaw Pillow and Duvet Set</h1>
// 			<a class="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">products</a>

// 		</div>

// 	  </div>

// </section>

// */}
//   <Product/>
//   <section className="bg-white py-8">
//     <div className="container py-8 px-6 mx-auto">
//       <a
//         className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
//         href="#"
//       >
//         About
//       </a>
//       <p className="mt-8 mb-8">
//         This template is inspired by the stunning nordic minimalist design - in
//         particular:
//         <br />
//         <a
//           className="text-gray-800 underline hover:text-gray-900"
//           href="http://savoy.nordicmade.com/"
//           target="_blank"
//         >
//           Savoy Theme
//         </a>{" "}
//         created by{" "}
//         <a
//           className="text-gray-800 underline hover:text-gray-900"
//           href="https://nordicmade.com/"
//         >
//           https://nordicmade.com/
//         </a>{" "}
//         and{" "}
//         <a
//           className="text-gray-800 underline hover:text-gray-900"
//           href="https://www.metricdesign.no/"
//           target="_blank"
//         >
//           https://www.metricdesign.no/
//         </a>
//       </p>
//       <p className="mb-8">
//         Lorem ipsum dolor sit amet, consectetur <a href="#">random link</a>{" "}
//         adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
//         magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel
//         facilisis volutpat. Vitae aliquet nec ullamcorper sit. Nullam eget felis
//         eget nunc lobortis mattis aliquam. In est ante in nibh mauris. Egestas
//         congue quisque egestas diam in. Facilisi nullam vehicula ipsum a arcu.
//         Nec nam aliquam sem et tortor consequat. Eget mi proin sed libero enim
//         sed faucibus turpis in. Hac habitasse platea dictumst quisque. In
//         aliquam sem fringilla ut. Gravida rutrum quisque non tellus orci ac
//         auctor augue mauris. Accumsan lacus vel facilisis volutpat est velit
//         egestas dui id. At tempor commodo ullamcorper a. Volutpat commodo sed
//         egestas egestas fringilla. Vitae congue eu consequat ac.
//       </p>
//     </div>
//   </section>
//   <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
//     <div className="container flex px-3 py-8 ">
//       <div className="w-full mx-auto flex flex-wrap">
//         <div className="flex w-full lg:w-1/2 ">
//           <div className="px-3 md:px-0">
//             <h3 className="font-bold text-gray-900">About</h3>
//             <p className="py-4">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
//               vel mi ut felis tempus commodo nec id erat. Suspendisse
//               consectetur dapibus velit ut lacinia.
//             </p>
//           </div>
//         </div>
//         <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right mt-6 md:mt-0">
//           <div className="px-3 md:px-0">
//             <h3 className="text-left font-bold text-gray-900">Social</h3>
//             <div className="w-full flex items-center py-4 mt-0">
//               <a href="#" className="mx-2">
//                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                   <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                 </svg>
//               </a>
//               <a href="#" className="mx-2">
//                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//               </a>
//               <a href="#" className="mx-2">
//                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                   <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
//                 </svg>
//               </a>
//               <a href="#" className="mx-2">
//                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                   <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </footer>
// </>

    
//   )
// }

// export default Landing
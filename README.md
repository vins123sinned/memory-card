# memory-card

A React-based memory game leveraging hooks to manage state while fetching data from an external API.

![Website Overview](https://github.com/user-attachments/assets/c6ccf120-307d-43b4-92bb-5f955e26c257)

<p align="center">
   <a href="https://stately-cuchufli-7175e0.netlify.app/">
    View live site
  </a>
</p>

## Installation Instructions
- Clone the repository to your local computer:

```bash
git clone git@github.com:your-username/memory-card.git
```
- Navigate into the directory

```bash
cd cv-application
```

- Install all dependencies

```bash
npm install
```

- Start the development server

```bash
npm run dev
```

- Now visit [http://localhost:5173](http://localhost:5173) in your browser and you're all set! Happy coding!

## Lessons Learned
This project was perfect for learning how to use the new useEffect hook alongside state and props in React. Being one of the most used hooks in React, this project helped me to familiarize myself with its purpose and also what it shouldn't be used for. It was also a great opportunity to practice everything I've learn about React so far, with some being:
- Using state and props like a pro
- When to use a useEffect, and when it isn't really necessary
- Creating clean UX with React
- How to structure React components, states, and hooks
- New hooks like useLayoutEffect and useRef

Thanks to the small scope of this project, I was able to dial into creating clean and scalable React code and how to refine each one to comply with React standards. By doing so, I was able to learn more about the inner workings of React and why it does things in a certain way. One such example was when I wanted to restore the current scroll position after a setState results in a layout change. 

Originally every layout change resets the screen back to the top which was a pain to scroll back down each time. In order to fix it I found out about how React commits to the DOM before letting the browser paints the changes onto the screen. This detail was essential in my solution as React's useLayoutEffect hook can be used to restore the scroll position after the DOM changes but before the browser repaints. This resulted in a seamless card shuffle even though a layout change occured. 

All in all I became more familiar with React and their underlying philosophy along with other useful hooks like uselayoutEffect and useRef. Doing this project helped me demystify parts React which I wasn't aware about earlier and become more comfortable following the basic concepts of React. It opened my eyes on how useful React is and why it still is one of the most popular JavaScript library to this day.

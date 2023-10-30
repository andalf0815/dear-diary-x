function MemoryCard() {
  return (
    <div className='card-container min-w-[500px] sm:min-w-full p-3 snap-center'>
      <div className='card flex flex-col p-4 border-2 rounded-md border-slate-400'>
        <p>3 days ago</p>
        <h1>😁 My second try for Dear Diary</h1>
        <div className='flex'>
          <div className='flex flex-col'>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad maxime, quae ratione velit id mollitia? Natus
              quasi nihil eligendi aliquid beatae, saepe temporibus adipisci obcaecati deserunt vero, vitae doloremque
              a?
            </p>
            <div className='flex'>
              <p>klettern | essen | spielen</p>
            </div>
            <div className='flex'>
              <p>Jakob | Chrissi</p>
            </div>
            <div className='flex'>
              <p>Spielplatz | Daheim</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <div>Picture</div>
            <div>Picture</div>
            <div>Picture</div>
            <div>Picture</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;

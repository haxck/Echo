import '../App.css'

export default function Letter() {

  const datas = {
    content: "<p>起初我以为自己是玫瑰花，不会表达爱，不会表达自己的感情，所以小王子离开了这座星球，留下我自己。我一直期待着他遇到狐狸以后能明白我对他的感情，这样他就会记得他的星球上还有一朵玫瑰花在等着他。</p><p>后来我想我大概是小王子，他才是玫瑰花。我爱他，却不知道如何去爱一个人，在分开之后，我才渐渐明白一些道理，我想，我得回到我的星球啊，我的玫瑰花，对我而言，独一无二的玫瑰花在等着我呢。</p><p>最后，我才明白我是那只狐狸。他驯服了我，驯服了我又离开了我，我知道他终究要去找他的玫瑰花的。尽管在他去找他的玫瑰花时，我也哭的很伤心。可是，我也因为这件事得到了好处，看到和他头发颜色一样的麦田，我就会想起他，我还是会觉得幸福。甚至会喜欢上风吹麦浪的声音。<br></p>",
    cTime: "2023-11-01T07:44:02.000+00:00",
    uname: "无名侠客"
  }
  return (
    <>
      <div className="p-6 flex flex-col min-h-screen items-center justify-center font-xiaolai bg-[#f4f1ec]">
        <div className="max-w-sm bg-orange-100/50 shadow-xl rounded-b-3xl rounded-t-lg">
          <div className="max-h-3 seal w-full rounded-t-lg"></div>
          <div className='shadow-lg p-4 rounded-3xl'>
            <div className="test letter-header text-center font-bold text-2xl">
            </div>
            <div className="letter-content mt-4 ">
              <div className="text-lg whitespace-pre-wrap flex flex-col gap-2 tracking-wide leading-7" dangerouslySetInnerHTML={{ __html: datas.content }}>

              </div>
            </div>
            <div className="letter-footer mt-4 flex flex-col items-end">
              <p className="font-bold">{datas.uname}</p>
              <p>{new Date(datas.cTime).toLocaleString()}</p>
            </div>
          </div>

        </div>

        <footer>
          <p>由 echo.haxck.com 提供支持</p>
        </footer>
      </div>
    </>
  )
}


import { Howl } from 'howler'

export const playBirthdaySong = () => {
  const sound = new Howl({
    src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'],
    volume: 0.5,
    loop: true
  })
  sound.play()
  return sound
}
import { Howl } from 'howler'

export const playBirthdaySong = () => {
  const sound = new Howl({
    src: ['./sounds/birthday-song.mp3'],
    volume: 0.5,
    loop: true
  })
  sound.play()
  return sound
}
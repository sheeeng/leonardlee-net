# getavataaars

See [getavataaars][getavataaars].

[getavataaars]: https://getavataaars.com/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelYellow&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=DefaultNatural&facialHairColor=Platinum&facialHairType=Blank&graphicType=Resist&hairColor=BrownDark&hatColor=PastelRed&mouthType=Smile&skinColor=Pale&topType=ShortHairShortFlat

## React

```js
<Avatar
  avatarStyle='Circle'
  topType='ShortHairShortFlat'
  accessoriesType='Blank'
  hairColor='BrownDark'
  facialHairType='Blank'
  clotheType='BlazerShirt'
  eyeType='Happy'
  eyebrowType='DefaultNatural'
  mouthType='Smile'
  skinColor='Pale'
/>
```

## HTML

```js
<img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale'
/>
```

## Commands

```shell
# Resize and center crop to exactly 256x256.
# The ^ modifier resizes so the smaller dimension reaches 256, then -extent crops to exactly 256x256.
# The `-background transparent` option needs to come before `-extent` option.
magick input.jpg -resize '256x256^' -gravity center -background transparent -extent '256x256' output.png
```
